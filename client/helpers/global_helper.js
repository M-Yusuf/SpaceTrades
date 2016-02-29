if (Meteor.isClient) {


  // L0
  Template.registerHelper('mapRadius', function() {
    // Check if user is logged in
    if (Meteor.userId()) {
      return Meteor.user().profile.mapRadius;
    } else {
      return 5
    }
  });

  Template.registerHelper('profile', function() {
    if (Meteor.userId()) {
      return Meteor.userId();
    } else {
      return 12312312
    }
  });

  Template.registerHelper('current', function() {
    return Router.current().path;
  });

  Template.registerHelper('timestamp', function() {
    var time = this.createdAt;
    var now = moment();

    var diff = now.diff(time);
    diff = diff / 60 / 1000;
    diff = Math.round(diff);

    var min = diff - 4 + " minutes ago"

    return min
  });

  Template.registerHelper('nameLookup', function(idParam) {
    var param = idParam.hash.idParam;
    return Meteor.users.find({
      _id: param
    }).fetch()[0].profile.name;
  });

  Template.registerHelper('listing', function() {
    return Listing.find({
      _id: id
    }).fetch()[0];
  });

  Template.registerHelper('pictureLookup', function(idParam) {
    var param = idParam.hash.idParam;
    return Meteor.users.find({
      id: param
    }).fetch()[0].profile.picturesm;
  });

  Template.registerHelper('locationFull', function() {
    return Session.get('locate');
  });

  // L1


  // Template.registerHelper('nameLookup', function(id) {
  //  return Meteor.users.find({_id: id}).fetch()[0].profile.name;
  // });
  _
  Template.registerHelper('usernameCurrent', function() {
    return Meteor.user().profile.name.split(" ")[0];
  });

  Template.registerHelper('picture', function() {
    return Meteor.user().profile.picturelrg;
  });

  Template.registerHelper('picturesmall', function() {
    return Meteor.user().profile.picturesm;
  });

  Template.registerHelper('Notification', function() {
    return Notification.find({}, {
      sort: {
        createdAt: -1
      }
    });
  });

  Template.registerHelper('chatCountUnread', function() {
    // From each user, if messages oustanding are unread, +1 for every DIFFERENT user
    return Message.find({
      receiver: Meteor.userId()
    }).count();
  });

  if (Session.get('offerSelected')) {

    Template.registerHelper('nameOfferer', function() {
      return Meteor.users.find({
        _id: Session.get('offerSelected').creator_id
      }).fetch()[0].profile.name;
    });

  }

}
