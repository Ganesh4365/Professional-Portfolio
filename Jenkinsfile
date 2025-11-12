pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'devops', url: 'https://github.com/Ganesh4365/Professional-Portfolio.git'
            }
        }

        stage('Build Docker Image') {
            steps {
               sh 'docker rmi -f portfolio-image'
                sh 'docker build -t portfolio-image .'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker stop portfolio-container || true
                docker rm portfolio-container || true
                docker run -d -p 80:80 --name portfolio-container portfolio-image
                '''
            }
        }
    }
}
