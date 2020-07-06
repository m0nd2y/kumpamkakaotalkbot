const School = require('node-school-kr')

const school = new School()

school.init(school.eduType.middle, school.region.gyeonggi, 'J100001489')


const sampleAsync = async function(date) {
        console.log('�~]��~H �~K� �~I�~K~] �| ~U보 - Async]\n')
        //console.log(await school.getMeal());
        var beforedata = await school.getMeal();
        //var afterdata = JSON.parse(beforedata);
        console.log(beforedata[date]);
}

sampleAsync("today")
