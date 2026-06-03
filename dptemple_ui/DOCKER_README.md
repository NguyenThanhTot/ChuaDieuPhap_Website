# Docker Setup Guide

This project includes Docker configurations for easy containerization and deployment.

## Files Included

- **Dockerfile** - Development image using `serve` package (port 3000)
- **Dockerfile.prod** - Production image using nginx (port 80)
- **docker-compose.yml** - Orchestration for frontend, backend, and database
- **nginx.conf** - Nginx configuration for production build
- **.dockerignore** - Files to exclude from Docker build context

## Quick Start

### Option 1: Build and Run Frontend Only

```bash
# Build the Docker image
docker build -t dptemple-ui:latest .

# Run the container
docker run -p 3000:3000 dptemple-ui:latest

# Access the app at http://localhost:3000
```

### Option 2: Production Build with Nginx

```bash
# Build the production image
docker build -f Dockerfile.prod -t dptemple-ui:prod .

# Run the container
docker run -p 80:80 dptemple-ui:prod

# Access the app at http://localhost
```

### Option 3: Full Stack with Docker Compose

```bash
# Start all services (frontend, backend, database)
docker-compose up --build

# Access:
# - Frontend: http://localhost:3000
# - Backend API: http://localhost:8080
# - MySQL: localhost:3306
```

## Environment Configuration

When running with Docker Compose, ensure your backend image is available. Update the backend service in `docker-compose.yml`:

```yaml
backend:
  image: your-backend-image:latest
```

To use environment variables:

```bash
# Development
docker run -p 3000:3000 -e VITE_API_URL=http://backend:8080/api dptemple-ui:latest

# Production
docker run -p 80:80 dptemple-ui:prod
```

## Image Details

### Development Image (Dockerfile)
- **Base**: node:20-alpine
- **Server**: serve package
- **Port**: 3000
- **Size**: ~200MB
- **Use Case**: Development and testing

### Production Image (Dockerfile.prod)
- **Base**: nginx:alpine
- **Server**: nginx with gzip compression
- **Port**: 80
- **Size**: ~50MB
- **Use Case**: Production deployments

## Docker Compose Services

1. **frontend** - Vite React app on port 3000
2. **backend** - Spring Boot API on port 8080
3. **db** - MySQL 8.0 on port 3306

Database credentials (in docker-compose.yml):
- **Username**: root
- **Password**: password
- **Database**: dieuphap

⚠️ Change these credentials for production!

## Health Checks

Both images include health checks:

- **Development**: HTTP request to `http://localhost:3000`
- **Production**: HTTP request to `http://localhost/health`

Check health status:
```bash
docker ps --all --format "table {{.Names}}\t{{.Status}}"
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :3000  # Linux/Mac
netstat -ano | findstr :3000  # Windows

# Kill process and retry
docker run -p 3001:3000 dptemple-ui:latest
```

### Clear Docker Cache
```bash
# Remove unused images
docker image prune

# Remove all stopped containers
docker container prune

# Full cleanup
docker system prune -a
```

### View Logs
```bash
# Container logs
docker logs <container-id>

# Follow logs in real-time
docker logs -f <container-id>

# Docker Compose logs
docker-compose logs -f frontend
```

## Building for CI/CD

```bash
# Build with tag
docker build -t dptemple-ui:v1.0.0 -f Dockerfile.prod .

# Push to registry
docker tag dptemple-ui:v1.0.0 your-registry/dptemple-ui:v1.0.0
docker push your-registry/dptemple-ui:v1.0.0
```

## Performance Tips

- Use `.dockerignore` to exclude unnecessary files
- Multi-stage build reduces final image size
- nginx compression reduces bandwidth usage
- Cache static assets with long expiration headers
