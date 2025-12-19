export class OperationResult {
    constructor({ success, data = null, message = "" }) {
        this.success = success;
        this.data = data;
        this.message = message;
    }

    static success(data = null, message = "") {
        return new OperationResult({ success: true, message, data })
    };
    
    static error(message) {
        return new OperationResult({success: false, message})
    }
}