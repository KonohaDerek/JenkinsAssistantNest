export class RunResponse {
    id: string;
    object: string;
    created_at: number;
    assistant_id: string;
    thread_id: string;
    status: string;
    started_at: number | null;
    expires_at: number;
    cancelled_at: number | null;
    failed_at: number | null;
    completed_at: number | null;
    required_action: string | null;
    last_error: string | null;
    model: string;
    instructions: string;
    tools: any[]; // 可根據具體 Tool 的結構進行修改
    tool_resources: Record<string, any>; // 若有具體結構可進行詳細定義
    metadata: Record<string, any>; // 若有具體結構可進行詳細定義
    temperature: number;
    top_p: number;
    max_completion_tokens: number | null;
    max_prompt_tokens: number | null;
    truncation_strategy: {
        type: string;
        last_messages: any | null; // 根據具體結構進行修改
    };
    incomplete_details: any | null; // 可根據具體不完整細節結構進行修改
    usage: any | null; // 對應使用情況定義，視具體結構而定
    response_format: string;
    tool_choice: string;
    parallel_tool_calls: boolean;

    constructor(data: any) {
        this.id = data.id;
        this.object = data.object;
        this.created_at = data.created_at;
        this.assistant_id = data.assistant_id;
        this.thread_id = data.thread_id;
        this.status = data.status;
        this.started_at = data.started_at;
        this.expires_at = data.expires_at;
        this.cancelled_at = data.cancelled_at;
        this.failed_at = data.failed_at;
        this.completed_at = data.completed_at;
        this.required_action = data.required_action;
        this.last_error = data.last_error;
        this.model = data.model;
        this.instructions = data.instructions;
        this.tools = data.tools;
        this.tool_resources = data.tool_resources;
        this.metadata = data.metadata;
        this.temperature = data.temperature;
        this.top_p = data.top_p;
        this.max_completion_tokens = data.max_completion_tokens;
        this.max_prompt_tokens = data.max_prompt_tokens;
        this.truncation_strategy = {
            type: data.truncation_strategy.type,
            last_messages: data.truncation_strategy.last_messages,
        };
        this.incomplete_details = data.incomplete_details;
        this.usage = data.usage;
        this.response_format = data.response_format;
        this.tool_choice = data.tool_choice;
        this.parallel_tool_calls = data.parallel_tool_calls;
    }
}
