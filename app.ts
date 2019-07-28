
const slackService = new SlackService(SecretConfig.token)
const postAPI = "https://slack.com/api/chat.postMessage"

function postAttachmentMessage() {
    slackService.postMessage(postAPI, SecretConfig.testChannelId, "test")
}

function doPost(e) {
    var payload = JSON.parse(e["parameter"]["payload"]);

    var type = payload["type"]
    if (type == "dialog_submission") {
        const dialogResponseUrl = payload["response_url"]
        const dialogPayload = {
            text: "Thankyou for request !"
        }

        const dialogParams: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
            method: "post",
            contentType: "application/json",
            payload: JSON.stringify(dialogPayload)
        }
        const dialogResponse = UrlFetchApp.fetch(dialogResponseUrl, dialogParams)

        return ContentService.createTextOutput() // 200 ok
    }

    const trigger_id = payload["trigger_id"]
    const response = slackService.openDialog(JSON.stringify({
        "callback_id": "ryde-46e2b0",
        "title": "Attendance Form",
        "submit_label": "Request",
        "notify_on_cancel": false,
        "state": "Limo",
        "elements": [
            {
                "type": "text",
                "label": "first name",
                "name": "first-name",
                "placeholder":"first name"
            },
            {
                "type": "text",
                "label": "last name",
                "name": "last-name",
                "placeholder":"last name"
            },
            {
                label: "what is joining project'name",
                type: "select",
                name: "what is joining project'name",
                options:[
                    {
                        label: "A",
                        value: "A",
                    },
                    {
                        label: "B",
                        value: "B",
                    },
                    {
                        label: "C",
                        value: "C",
                    }
                ]
            },
            {
                label: "late or absent reason",
                type: "select",
                name: "late or absent reason",
                options:[
                    {
                        label: "traffic delay",
                        value: "traffic delay",
                    },
                    {
                        label: "poor health",
                        value: "poor health",
                    },
                ]
            },
        ]
    }), trigger_id)
    return ContentService.createTextOutput() // 200 ok
}
