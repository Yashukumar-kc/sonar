pipeline {
    agent { label 'agent01' }

    tools {
        sonarQubeScanner 'SonarScanner' // Name from Jenkins Global Tool Config
    }

    environment {
        SONAR_PROJECT_KEY = 'sonar'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/<your-username>/sonar.git'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQubeServer') { // Name from Jenkins config
                    sh """
                    sonar-scanner \
                      -Dsonar.projectKey=${SONAR_PROJECT_KEY} \
                      -Dsonar.sources=. \
                      -Dsonar.host.url=http://<sonarqube-server>:9000 \
                      -Dsonar.login=$SONAR_AUTH_TOKEN
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

