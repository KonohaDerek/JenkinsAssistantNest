export class CreateMessageResponse {
    id: string;
    object: string;
    created_at: number;
    assistant_id: string;
    thread_id: string;
    run_id: string;
    role: string;
    content: Array<MessageContent>;

    constructor(data: any) {
        this.id = data.id;
        this.object = data.object;
        this.created_at = data.created_at;
        this.assistant_id = data.assistant_id;
        this.thread_id = data.thread_id;
        this.run_id = data.run_id;
        this.role = data.role;
        this.content = data.content.map((content: any) => new MessageContent(content));
    }
}

export class MessageResponse {
    object: string;
    data: Array<MessageData>;

    constructor(data: any) {
        this.object = data.object;
        this.data = data.data.map((message: any) => new MessageData(message));
    }
}

export class MessageData {
    id: string;
    object: string;
    created_at: number;
    assistant_id: string;
    thread_id: string;
    run_id: string;
    role: string;
    content: Array<MessageContent>;

    constructor(data: any) {
        this.id = data.id;
        this.object = data.object;
        this.created_at = data.created_at;
        this.assistant_id = data.assistant_id;
        this.thread_id = data.thread_id;
        this.run_id = data.run_id;
        this.role = data.role;
        this.content = data.content.map((content: any) => new MessageContent(content));
    }
}

export class MessageContent {
    type: string;
    text: MessageContentText;

    constructor(data: any) {
        this.type = data.type;
        this.text = new MessageContentText(data.text);
    }
}

export class MessageContentText {
    value : string;
    annotations: Array<any>;

    constructor(data: any) {
        this.value = data.value;
        this.annotations = data.annotations;
    }
}