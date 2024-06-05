export class Message {
    message_id: number;
    sender_id: number;
    receiver_id: number;
    content: string;
    sent_at: Date;
    updated_at: Date;

    constructor(
        message_id: number,
        sender_id: number,
        receiver_id: number,
        content: string,
        sent_at: Date,
        updated_at: Date
    ) {
        this.message_id = message_id;
        this.sender_id = sender_id;
        this.receiver_id = receiver_id;
        this.content = content;
        this.sent_at = sent_at;
        this.updated_at = updated_at;
    }
}