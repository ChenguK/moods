const Mood = require("../models/mood");
const Comment = require("../models/comments");


module.exports = {
    create,
    update,
    // addToPost,
    delCommment
};



function create(req, res) {
    let user = req.user;
    Mood.findOne({
            "_id": req.params.id
        },
        function (err, mood) {

            // const post = mood.posts.id(req.params.id);
            // Update req.body to contain user info
            req.body.userId = req.user._id;
            req.body.userName = req.user.name;
            // Add the comment
            console.log(req.body);
            mood.comments.push(req.body);
            mood.save(function (err) {
                // console.log("error is" + err);
                res.redirect(`/moods/${mood._id}`,
                    moods,
                );

            })
        });
}

// function addToPost(req, res) {
//     let user = req.user;
//     Mood.findOne({
//             "posts._id": req.params.id
//         },
//         function (err, mood) {

//             const post = mood.posts.id(req.params.id);

//         })

// }

function update(req, res) {

}



function delCommment(req, res) {

}