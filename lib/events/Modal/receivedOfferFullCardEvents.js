if (Meteor.isClient) {

Template.receivedOfferFullCard.events({
	'click #profileReceivedAccept': function(){
		sweetAlert({
					title: "Offer Accepted",
					html: "true",
					type: "success",
					timer: 2000,
					showConfirmButton: false
				});
		var id = Session.get('offerSelected')._id;
		var listing = Session.get('offerSelected').listingId;
    var time = Session.get('offerSelected').timePeriod;

		var options = {
			id: id,
			listingId: listing,
      time: time,
			destination: [Session.get('offerSelected').creator_id, Meteor.userId()]

		}

		Meteor.call('acceptOffer', options);

		// Both parties get a message
		Meteor.call('pulseNotify', options);

		// IF Morning 2pm, Afternoon: 7pm, Night 12am
		// Calculate the delay between the day and send on the day

		var userA = Listing.find({_id: this.listingId}).fetch()[0].creator_id;

		function sendFeedback() {

			options = {
				recipients: [ userA, Session.get('offerSelected').creator_id]
			}

			Meteor.call('pulseNotify', options);
		}

		// send feedback to all included parties of the meetup

		var dateStart = new Date();
		var dateStop = new Date(this.date);

		var timeDifference = (dateStart - dateStop)/1000;

		Meteor.setTimeout( sendFeedback(), timeDifference);
	},
	'click #profileReceivedDecline': function(){
		sweetAlert({
					title: "Offer Declined",
					html: "true",
					type: "error",
					timer: 2000,
					showConfirmButton: false
				});

		var id = Session.get('offerSelected')._id;
		var listing = Session.get('offerSelected').listingId;
		var options = {
			id: id,
			listingId: listing
		}

		Meteor.call('declineOffer', options);
		Meteor.call('pulseNotify', options);
	}
});

}