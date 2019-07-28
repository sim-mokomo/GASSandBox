class SlackService {
    private token: string
    constructor(token: string) {
        this.token = token
    }

    postMessage(url: string, channel: string, text: string, username: string = "default bot name", icon_emoji: string = "") {
        var payload = {
            "token": this.token,
            "channel": channel,
            "text": text,
            "attachments": JSON.stringify([
                {
                    "text": "Choose a game to play",
                    "fallback": "You are unable to choose a game",
                    "callback_id": "wopr_game",
                    "color": "#3AA3E3",
                    "attachment_type": "default",
                    "actions": [
                        {
                            "name": "game",
                            "text": "Chess",
                            "type": "button",
                            "value": "chess"
                        },
                        {
                            "name": "game",
                            "text": "Falken's Maze",
                            "type": "button",
                            "value": "maze"
                        },
                        {
                            "name": "game",
                            "text": "Thermonuclear War",
                            "style": "danger",
                            "type": "button",
                            "value": "war",
                            "confirm": {
                                "title": "Are you sure?",
                                "text": "Wouldn't you prefer a good game of chess?",
                                "ok_text": "Yes",
                                "dismiss_text": "No"
                            }
                        }
                    ]
                }
            ])
        };
        var params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
            "method": "post",
            "payload": payload
        };
        const response = UrlFetchApp.fetch(url, params)
    }

    getChannelInfos() {
        var url = `https://slack.com/api/channels.list?token=${this.token}`
        var data = JSON.parse(UrlFetchApp.fetch(url).getContentText())
        return data["channels"]
    }

    getMessages(channelId: string, count: number) {
        var url = `https://slack.com/api/channels.history?token=${this.token}&channel=${channelId}&count=${count}`
        var data = JSON.parse(UrlFetchApp.fetch(url).getContentText())

        return data["messages"]
    }

    openDialog(dialogConstructorByJson, triggerId) {
        var payload = {
            token: this.token,
            trigger_id: triggerId,
            dialog: dialogConstructorByJson,
        }

        var params: GoogleAppsScript.URL_Fetch.URLFetchRequestOptions = {
            method: "post",
            payload : payload
        }

        const url = "https://slack.com/api/dialog.open"
        const response = UrlFetchApp.fetch(url, params)
        return response
    }
}
