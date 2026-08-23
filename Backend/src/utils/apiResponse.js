class apiResponse{
    constructor(statusCode,data,message="success"){
        this.statusCode=statusCode
        this.data=message
        this.success=statusCode <400

    }
}

export {apiResponse}