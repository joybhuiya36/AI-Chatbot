export function success(message: string, data: any) {
    const response = {
        success: true,
        message: message,
        result: "" as any
    };
    response.result = Array.isArray(data) ? { data } : data;
    return response;
}

export const failure = (message: string, error = {}) => {
    return {
        success: false,
        message: message,
        errors: error
    };
};
