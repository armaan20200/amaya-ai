# Deployment Guide for Amaya AI

## Render Deployment

### Prerequisites
- GitHub repository with your code
- OpenAI API key
- Render account (free tier available)

### Step-by-Step Render Deployment

1. **Connect GitHub Repository**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select `armaan20200/amaya-ai` repository

2. **Configure Service Settings**
   ```
   Name: amaya-ai
   Environment: Python 3
   Build Command: pip install flask flask-cors openai gunicorn
   Start Command: gunicorn --bind 0.0.0.0:$PORT --workers 1 main:app
   ```

3. **Set Environment Variables**
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `SESSION_SECRET`: A random string for session security
   - `PYTHON_VERSION`: 3.11.6

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your app
   - You'll get a URL like `https://amaya-ai.onrender.com`

### Alternative Deployment Methods

#### Using render.yaml (Infrastructure as Code)
The repository includes a `render.yaml` file for automatic deployment:
1. Fork the repository
2. Connect to Render
3. Render will automatically detect and use the configuration

#### Manual Configuration
If render.yaml doesn't work, use these manual settings:
- **Runtime**: Python 3.11
- **Build Command**: `pip install flask flask-cors openai gunicorn`
- **Start Command**: `gunicorn --bind 0.0.0.0:$PORT --workers 1 main:app`

### Environment Variables Setup

#### Required Variables
- `OPENAI_API_KEY`: Get from [OpenAI Platform](https://platform.openai.com/api-keys)
- `SESSION_SECRET`: Generate with: `python -c "import secrets; print(secrets.token_hex(16))"`

#### Optional Variables
- `PYTHON_VERSION`: 3.11.6 (if needed)
- `PORT`: Automatically set by Render

### Troubleshooting

#### Common Issues

1. **Build Fails**
   - Check build logs in Render dashboard
   - Ensure all dependencies are listed correctly
   - Verify Python version compatibility

2. **App Won't Start**
   - Check if `main.py` imports `app` correctly
   - Verify gunicorn can find the Flask app instance
   - Check start command syntax

3. **OpenAI API Errors**
   - Verify API key is correctly set in environment variables
   - Check API key has sufficient credits
   - Ensure API key has correct permissions

4. **Session Errors**
   - Set SESSION_SECRET environment variable
   - Use a secure random string

#### Build Logs
Monitor deployment in Render dashboard:
- Build tab: Shows installation progress
- Logs tab: Shows runtime errors
- Events tab: Shows deployment history

### Performance Optimization

1. **Free Tier Limitations**
   - Apps sleep after 15 minutes of inactivity
   - First request after sleep takes ~30 seconds
   - 750 hours/month limit

2. **Upgrade Benefits**
   - No sleeping
   - Faster builds
   - More concurrent connections
   - Custom domains

### Post-Deployment

1. **Test the Application**
   - Visit your Render URL
   - Test chat functionality
   - Verify social links work
   - Check mobile responsiveness

2. **Monitor Performance**
   - Check Render metrics
   - Monitor OpenAI API usage
   - Watch for any errors in logs

3. **Custom Domain (Optional)**
   - Add custom domain in Render settings
   - Update DNS records
   - Enable HTTPS (automatic)

### Security Considerations

- Environment variables are encrypted at rest
- HTTPS is enabled by default
- Keep API keys secure and rotate regularly
- Monitor usage to prevent unexpected charges

### Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com
- GitHub Issues: Create issues in the repository for bugs