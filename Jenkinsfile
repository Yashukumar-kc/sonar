pipeline {
    agent { label 'agent01' }

    environment {
        SONAR_PROJECT_KEY = 'sonar'
        SONAR_AUTH_TOKEN = credentials('sonar-token') // Jenkins credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Yashukumar-kc/sonar.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQubeServer') { // Server name from Jenkins config
                    sh """
                    ${tool 'SonarScanner'}/bin/sonar-scanner \
                      -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                      -Dsonar.sources=. \
                      -Dsonar.host.url=http://<sonarqube-server>:9000 \
                      -Dsonar.login=${SONAR_AUTH_TOKEN}
                    """
                }
            }
        }

        stage("Quality Gate") {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}

