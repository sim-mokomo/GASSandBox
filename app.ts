
const slackService = new SlackService(SecretConfig.token)
const postAPI = "https://slack.com/api/chat.postMessage"

function postAttachmentMessage() {
    slackService.postMessage(postAPI, SecretConfig.testChannelId, "test")
}
}
