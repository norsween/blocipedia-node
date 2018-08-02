const Wiki = require("./models").Wiki;
const User = require("./models").User;
const Collaborator = require("./models").Collaborator;
const Authorizer = require("../policies/application");

module.exports = {

  getAllPublicWikis(callback){
    return Wiki.findAll({
	where: {
	   private: 'f'
	}
    })
    .then((wikis) => {
      callback(null, wikis);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getAllPrivateWikis(callback){
    return Wiki.findAll({
	where: {
	   private: 't'
	}
    })
    .then((wikis) => {
      callback(null, wikis);
    })
    .catch((err) => {
      callback(err);
    })
  },

  getWiki(id, callback){
      let result = {};
      return Wiki.findById(id)
      .then((wiki) => {
	  if(!wiki){
              callback(404);
          } else {
              result["wiki"] = wiki;
              //Collaborator.scope({method: ["collaboratorsFor", id]}).all()
              //.then((collaborators) => {
              //    result["collaborators"] = collaborators;
              //    callback(null, result);
              //})
              //.catch((err) => {
              //    callback(err);
              })
          }
      })
  },

  addWiki(newWiki, callback){
      return Wiki.create({
          title: newWiki.title,
          body: newWiki.body,
          private: newWiki.private,
          userId: newWiki.userId
      })
      .then((wiki) => {
          callback(null, wiki);
      })
      .catch((err) => {
          callback(err);
      })
  },

  updateWiki(id, updatedWiki, callback){
      return Wiki.findById(id)
      .then((wiki) => {
          if(!wiki){
              return callback("Wiki not found");
          }

          wiki.update(updatedWiki, {
              fields: Object.keys(updatedWiki)
          })
          .then(() => {
              callback(null, wiki);
          })
          .catch((err) => {
              callback(err);
          });
      });
  },

  deleteWiki(id, callback){
      return Wiki.destroy({
          where: {id}
      })
      .then((wiki) => {
          callback(null, wiki);
      })
      .catch((err) => {
          callback(err);
      })
  },

  downgradePrivateWikis(id){
      return Wiki.all()
      .then((wikis) => {
          wikis.forEach((wiki) => {
              if(wiki.userId == id && wiki.private == true){
                  wiki.update({
                      private: false
                  })
              }
          })
      })
      .catch((err) => {
          callback(err);
      })
  }
}
