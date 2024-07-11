class Reservation {
  constructor(guests, room, days) {
    this.guests = guests;
    this.room = room;
    this.days = days;
    this.total = days * Reservation.baseFee;
  }

  static baseFee = 150;

  static showBaseFee() {
    console.log(`Base fee: $${Reservation.baseFee}`);
  }

  static get premiunFee() {
    return Reservation.baseFee * 1.2;
  }
}

Reservation.showBaseFee();
