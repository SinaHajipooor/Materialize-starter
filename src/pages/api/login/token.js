export default function handler(req, res) {

    const token = req.body;
    console.log(token);


    res.status(200).json({
        message: 'token has been saved successfully'
    })
}