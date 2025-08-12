pipeline {
    agent any

    environment {
        SONARQUBE_ENV = credentials('sonarqube-token-id') // If using token via credentials
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests with Coverage') {
            steps {
                sh 'npm test'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                    sh 'npx sonar-scanner'
                }
            }
        }
    }
}

