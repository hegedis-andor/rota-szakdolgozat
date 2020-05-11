pipeline {
  agent any
  parameters { 
    string(name: 'version', defaultValue: '10.15.1', description: 'nodejs version')
    string(
      name: 'peopleToNotify', 
      defaultValue: 'hegedus.andor@stud.u-szeged.hu', 
      description: 'comma separated email addresses to send notification'
    )
  }
  stages {
    stage('initialization') { steps { nodejs("${params.version}") { bat 'npm install'} } }
    
    stage('lint, test, build') {
      parallel {
        stage('lint')  { steps { nodejs("${params.version}") { bat 'npm run lint'  } } }
        stage('test')  { steps { nodejs("${params.version}") { bat 'npm run test'  } } }
        stage('build') { steps { nodejs("${params.version}") { bat 'npm run build' } } }
      }
      post { failure { script { error "A stage failed, exiting now..." } } }
    }

    stage('deploy') {
      when { expression { env.BRANCH_NAME == "master" } }
      steps {
        echo 'building image...'
        bat 'docker build -t rota .'

        echo 'pushing image to heroku registry...'
        withCredentials([usernamePassword(credentialsId: 'heroku', passwordVariable: 'PWD', usernameVariable: 'USR' )]) {
          bat "docker login --username=$USR --password=$PWD registry.heroku.com"
          bat 'docker tag rota registry.heroku.com/rota-deploy/web'
          bat 'docker push registry.heroku.com/rota-deploy/web'
        }
      }
      post { 
        success { 
          mail to: "${params.peopleToNotify}",
            subject: "New release: ${currentBuild.fullDisplayName}",
            body: "Docker image was pushed to heroku registry: registry.heroku.com/rota-deploy/web. Do not forget to release the app with: 'heroku container:release web -a rota-deploy' ."
        }
      }
    }
  }
  post { 
    always { deleteDir() }
    failure {
      mail to: "${params.peopleToNotify}",
             subject: "The pipeline failed: ${currentBuild.fullDisplayName}",
             body: "Check it: ${env.BUILD_URL} ."
    }
  }
}
