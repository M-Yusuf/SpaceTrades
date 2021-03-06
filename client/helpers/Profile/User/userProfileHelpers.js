if (Meteor.isClient) {

	Template.UserProfile.helpers({
		profile: function() {
			return Meteor.users.find({
				_id: id_user
			}).fetch()[0].profile;
		},
    feedback: function(){
      return Feedback.find({rated: this.name});
    },
    isOwner: function(){
      // function user_check(){
       if (id_user == Meteor.userId()){
        return true;
       }
       else {
        return false;
       }
     // }
     // return user_check();
    },
    feedbackExists: function() {

      var count = Meteor.users.find({_id: id_user}).fetch()[0].profile.reviewscount;
      var state = count > 0 ? state = true : state = false;

      return state
    },
		profimg: function() {
			return Meteor.users.find({
				_id: id_user
			}).fetch()[0].profile.picturelrg;
		},
		defaultCheck: function(){
			var results = Meteor.users.find()
			return Boolean(results.count())
		},
		listing: function() {
			return Listing.find({
				creator_id: id_user,
				status: "Pending"
			}, {
				limit: 4
			});
		},
    userid: function(){
      return this.id
    },
		starRating: function(){
			Meteor.users.find({_id: Meteor.userId()}).fetch();

			$(".rating input[type='radio']");
var s =2;
			return s
		},
		name: function() {
			return Meteor.users.find({
				_id: id_user
			}).fetch()[0].profile.name;
		},
		userId: function() {
			return id;
		},
		facebook: function() {
			var fbid = Meteor.users.find({
				_id: id_user
			}).fetch()[0].services.facebook.id;
			var fblink = "https://www.facebook.com/" + fbid;
			return fblink
		},
    chatId: function() {
      var currentConversation = Message.find({
        receiver: id_user
      }).fetch();
      var convoState = !_.isEmpty(currentConversation);

      if (convoState) {

        var convo_id = currentConversation[0].conversation;
        return convo_id;
      } else {

        var convo_id = Random.id(10);
        return convo_id
      }
    },
		online: function() {
			var status = Meteor.users.find({
				_id: id_user
			}).fetch()[0].status.online;
			if (status == true) {
				var color = "#24ec3d";
				var innercolor = "#029402";
				var text = "Online";
			} else {
				var color = "#ff0000";
				var innercolor = "#5858FD";
				var text = "Offline";
			}

			return {
				color: color,
				innercolor: innercolor,
				text: text
			};
		},
		memberSince: function() {
			var monthNames = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			];
			var baseDate = Meteor.users.find({
				_id: id_user
			}).fetch()[0].createdAt;
			var monthNumber = baseDate.getMonth();
			var month = monthNames[monthNumber];
			var year = baseDate.getFullYear();
			var day = baseDate.getDate();
			var dateCreated = month + " " + day + ", " + year;
			return dateCreated;
		},
		month: function() {
			var monthNumber = new Date().getMonth();
			var monthNames = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			];
			var month = monthNames[monthNumber];
			return month;
		}
	});

}
