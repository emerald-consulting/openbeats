export default class UserData {
  constructor(id, data) {
    this.userId = id
    this.firstName = data.given_name ?? "";
    this.lastName = data.family_name ?? "";
    this.email = data.email ?? "";

    if (data.user_metadata) {
      this.bio = data.user_metadata.bio ?? "";
      this.genre = data.user_metadata.genre ?? "";
      this.age = data.user_metadata.age ?? "";
    }
  }

  asState() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      bio: this.bio,
      genre: this.genre,
      age: this.age,
    };
  }
}