const LabelService = require('../service/label_service')
const verifyLabelExists = async(ctx,next) => {
    const { labels} = ctx.request.body
    const newLabels = []
    console.log('1');
    try {
            // 判断label是否存在
        // 存在则将 name id 存在数组中
        // 不存在则创建label,并将name id 存在数组中
        for ( const name of labels){
            const result = await LabelService.quertLabelByName(name)
            const labelObj = { name }
            if(result){
                labelObj.id = result.id //=> { name:'rap', id:2}
            }else{
            const result = await LabelService.create(name)
            labelObj.id = result.insertId  //=> { name:'rap', id:2}
            }
            newLabels.push(labelObj)
        }
        // 将存储的数组存在ctx.labels中
        ctx.labels = newLabels
    await next()
    } catch (error) {
        ctx.body = {
            code:-1,
            error
        }
    }
}

module.exports = verifyLabelExists;