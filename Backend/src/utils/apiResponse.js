class apiResponse{
    constructor(statusCode,data,message="success"){
        this.statusCode=statusCode
        this.data=datathis.message
        this.success=statusCode <400

    }
}

export {apiResponse}