pipeline {
    agent any

    environment {
        DOCKER_REPO = "srinathudhayakumar/mealdb-react"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('frontend/mealdb-frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build React App') {
            steps {
                dir('frontend/mealdb-frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Get short git commit hash (Windows-safe)
                    def commitHash = bat(
                        script: '''
                        @echo off
                        git rev-parse --short HEAD
                        ''',
                        returnStdout: true
                    ).trim()

                    env.IMAGE_TAG = commitHash

                    echo "Docker image tag: ${env.IMAGE_TAG}"

                    // Build Docker image from the folder containing Dockerfile
                    dir('frontend/mealdb-frontend') {
                        bat """
                        docker build -t %DOCKER_REPO%:%IMAGE_TAG% .
                        docker tag %DOCKER_REPO%:%IMAGE_TAG% %DOCKER_REPO%:latest
                        """
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    bat """
                    docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                    docker push %DOCKER_REPO%:%IMAGE_TAG%
                    docker push %DOCKER_REPO%:latest
                    """
                }
            }
        }

    }

    post {
        success {
            echo 'CI completed successfully'
        }
        failure {
            echo 'CI failed'
        }
        always {
            cleanWs()
        }
    }
}
