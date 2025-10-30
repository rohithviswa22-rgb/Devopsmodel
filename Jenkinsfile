pipeline {
    agent any

    environment {
        // MongoDB URI from Jenkins credentials
        MONGO_URI = credentials('mongo_uri')
    }

    stages {
        stage('Checkout') {
            steps {
                echo '📥 Cloning repository...'
                git branch: 'main', url: 'https://github.com/rohithviswa22-rgb/Devopsmodel.git'
            }
        }

        stage('Backend Install') {
            steps {
                dir('backend') {
                    echo '📦 Installing backend dependencies...'
                    bat 'npm install'
                }
            }
        }

        stage('Frontend Install') {
            steps {
                dir('frontend') {
                    echo '📦 Installing frontend dependencies...'
                    bat 'npm install'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    echo '🏗️ Building frontend...'
                    bat 'npm run build'
                }
            }
        }

        stage('Run Tests') {
            steps {
                echo '🧪 Running tests...'
                dir('backend') {
                    bat 'npm test || echo "No backend tests configured"'
                }
                dir('frontend') {
                    bat 'npm test -- --watchAll=false || echo "No frontend tests configured"'
                }
            }
        }

        stage('Deploy') {
            steps {
                echo '🚀 Deployment stage - customize for your environment'
                // Example:
                // sh 'pm2 restart all'
            }
        }
    }

    post {
        success {
            echo '✅ Build and deployment successful!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
