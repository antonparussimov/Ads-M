module.exports = (app) => {
    const { Configuration, OpenAIApi } = require("openai");
    const bodyParser = require("body-parser");
    var router = require("express").Router();
  
    router.use(bodyParser.json());
    router.post("/", (req, res, next) => {
      const message = SendChatgpt(req.body.data).then((result) => {
        console.log(result);
        console.log(typeof result["content"]);
        res.send(result["content"]);
      });
    });
  
    app.use("/api/modify", router)
  
  
  async function SendChatgpt(TextFromFront) {
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
  
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: TextFromFront }],
    });
    console.log(completion.data.choices[0].message);
    return completion.data.choices[0].message;
  }
  };