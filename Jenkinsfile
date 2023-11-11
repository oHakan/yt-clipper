pipeline {
    agent any

    environment {
        REMOTE_HOST = credentials('host')
        REMOTE_USER = credentials('server_user')
        WEBHOOK_URL = credentials('webhook-url')
        CREDENTIALS_ID = '0160846a-3996-4065-99b6-bae2693ca590'
    }

    stages {
        stage('Deploy Process') {
            steps {
                script {
                    sshagent (credentials: ['0160846a-3996-4065-99b6-bae2693ca590']) {
                        sh "ssh -o StrictHostKeyChecking=no $REMOTE_USER@$REMOTE_HOST 'cd yt-clipper && docker compose down && docker rmi -f yt-clipper-web && git pull && docker compose up -d'"
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                discordSend description: "Build Success!",  enableArtifactsList: true, footer: "Success", showChangeset: true , link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: WEBHOOK_URL
            }
        }
        failure {
            script {
                discordSend description: "Build Failed! Check you Jenkins output.", enableArtifactsList: true, footer: "Failure", link: env.BUILD_URL, result: currentBuild.currentResult, title: JOB_NAME, webhookURL: WEBHOOK_URL
            }
        }
    }
}