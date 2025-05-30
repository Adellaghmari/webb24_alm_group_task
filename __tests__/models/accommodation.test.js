const { User, Accommodation } = require("../test-setup");

describe("Accommodation Model", () => {
  let testUser;

  // Skapar en användare innan testerna körs
  beforeAll(async () => {
    testUser = await User.create({
      username: "accommodationuser",
      email: "accommodation@test.com",
    });
  });

  it("should create an accommodation", async () => {
    const accommodation = await Accommodation.create({
      address: "Testgatan 1",
      city: "Stockholm",
      country: "Sweden",
      postalCode: "12345",
      rent: 5000,
      rooms: 2,
      userId: testUser.id,
    });

    expect(accommodation).toBeDefined();
    expect(accommodation.address).toBe("Testgatan 1");
    expect(accommodation.city).toBe("Stockholm");
    expect(accommodation.country).toBe("Sweden");
    expect(accommodation.postalCode).toBe("12345");
    expect(accommodation.rent).toBe(5000);
    expect(accommodation.rooms).toBe(2);
    expect(accommodation.userId).toBe(testUser.id);
  });

  it("should require all required fields", async () => {
    // Försöker skapa ett boende utan alla obligatoriska fält
    try {
      await Accommodation.create({
        address: "Testgatan 2",
        // Saknar city, country, postalCode, rent, rooms
      });
      // Om det lyckas, misslyckas testet
      fail("Should not create accommodation without required fields");
    } catch (error) {
      // Testet ska fånga upp ett valideringsfel
      expect(error.name).toBe("SequelizeValidationError");
    }
  });

  it("should associate accommodation with user", async () => {
    const accommodation = await Accommodation.create({
      address: "Testgatan 3",
      city: "Göteborg",
      country: "Sweden",
      postalCode: "54321",
      rent: 7000,
      rooms: 3,
      userId: testUser.id,
    });

    // Hämta alla boenden som tillhör användaren
    const userAccommodations = await Accommodation.findAll({
      where: { userId: testUser.id },
    });

    expect(userAccommodations.length).toBeGreaterThan(0);
    // Kontrollerar att ett av boendena är det vi just skapade
    const found = userAccommodations.some(
      (acc) => acc.id === accommodation.id
    );
    expect(found).toBe(true);
  });

  it("should delete accommodations when user is deleted (CASCADE)", async () => {
    // Skapa en ny användare för detta test
    const cascadeUser = await User.create({
      username: "cascadeuser",
      email: "cascade@test.com",
    });

    // Skapa ett boende för denna användare
    await Accommodation.create({
      address: "Cascadegatan 1",
      city: "Malmö",
      country: "Sweden",
      postalCode: "67890",
      rent: 6000,
      rooms: 1,
      userId: cascadeUser.id,
    });

    // Kontrollera att boendet finns
    const accommodationsBefore = await Accommodation.findAll({
      where: { userId: cascadeUser.id },
    });
    expect(accommodationsBefore.length).toBe(1);

    // Ta bort användaren
    await cascadeUser.destroy();

    // Kontrollera att boendet också har tagits bort
    const accommodationsAfter = await Accommodation.findAll({
      where: { userId: cascadeUser.id },
    });
    expect(accommodationsAfter.length).toBe(0);
  });
}); 