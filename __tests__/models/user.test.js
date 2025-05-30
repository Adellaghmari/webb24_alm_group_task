const { User } = require("../test-setup");

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({ 
      username: "testuser", 
      email: "test@test.com",
      profileImage: "https://example.com/image.jpg"
    });

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
    expect(user.profileImage).toBe("https://example.com/image.jpg");
  });

  it("should validate email format", async () => {
    // Försöker skapa en användare med ogiltig e-post
    try {
      await User.create({ username: "testuser2", email: "invalid-email" });
      // Om det lyckas, misslyckas testet
      fail("Should not create user with invalid email");
    } catch (error) {
      // Testet ska fånga upp ett valideringsfel
      expect(error.name).toBe("SequelizeValidationError");
    }
  });

  it("should not allow duplicate usernames", async () => {
    // Skapar först en användare
    await User.create({ username: "uniqueuser", email: "unique@test.com" });
    
    // Försöker skapa en användare med samma användarnamn
    try {
      await User.create({ username: "uniqueuser", email: "another@test.com" });
      // Om det lyckas, misslyckas testet
      fail("Should not create user with duplicate username");
    } catch (error) {
      // Testet ska fånga upp ett valideringsfel
      expect(error.name).toBe("SequelizeUniqueConstraintError");
    }
  });

  it("should not allow duplicate emails", async () => {
    // Skapar först en användare
    await User.create({ username: "emailuser", email: "same@test.com" });
    
    // Försöker skapa en användare med samma e-post
    try {
      await User.create({ username: "emailuser2", email: "same@test.com" });
      // Om det lyckas, misslyckas testet
      fail("Should not create user with duplicate email");
    } catch (error) {
      // Testet ska fånga upp ett valideringsfel
      expect(error.name).toBe("SequelizeUniqueConstraintError");
    }
  });

  it("should validate profileImage as a URL", async () => {
    // Försöker skapa en användare med ogiltig profilbilds-URL
    try {
      await User.create({ 
        username: "imageuser", 
        email: "image@test.com",
        profileImage: "not-a-url" 
      });
      // Om det lyckas, misslyckas testet
      fail("Should not create user with invalid profile image URL");
    } catch (error) {
      // Testet ska fånga upp ett valideringsfel
      expect(error.name).toBe("SequelizeValidationError");
    }
  });
});

