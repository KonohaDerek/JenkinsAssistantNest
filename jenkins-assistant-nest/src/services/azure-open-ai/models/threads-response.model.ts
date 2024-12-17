export class ThreadsResponse {
    id: string;
    object: string;
    created_at: number;

    constructor(data: any) {
        this.id = data.id;
        this.object = data.object;
        this.created_at = data.created_at;
    }
}