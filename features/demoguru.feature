Feature: The Demo Guru website 
  Background:
    Given I am in "https://demo.guru99.com/test/newtours/index.php"

  Scenario: As a new user, I want to register a new account
    When I click the button/link "a=REGISTER"
    Then the url should have "register"
    
    # fill contact information
    When I type "FirstTomato" to input field "[name='firstName']"
    And I type "LastTomato" to input field "[name='lastName']"
    And I type "1234567890" to input field "[name='phone']"
    And I type "firsttomato@email.com" to input field "[name='userName']"

    # fill mailing information
    And I type "123 Street Name" to input field "[name='address1']"
    And I type "London" to input field "[name='city']"
    And I type "England" to input field "[name='state']"
    And I type "SW5 9PE" to input field "[name='postalCode']"
    And I select "UNITED KINGDOM" from the dropdown "[name='country']"

    # fill user information
    And I type "FirstTomatoLastTomato" to input field "[name='email']"
    And I type "FirstTomatoPassword123" to input field "[name='password']"
    And I type "FirstTomatoPassword123" to input field "[name='confirmPassword']"

    And I click the button/link "[name='submit']"
    Then the url should have "register_sucess"
  
  Scenario: As a user, I want to book a round trip flight
    Given I am in "https://demo.guru99.com/test/newtours/reservation.php"
    Then the url should have "reservation"
    When I select "4" from the dropdown "[name='passCount']"
    And I select "Seattle" from the dropdown "[name='fromPort']"
    And I select "11" from the dropdown "[name='fromMonth']"
    And I select "23" from the dropdown "[name='fromDay']"
    And I select "Paris" from the dropdown "[name='toPort']"
    And I select "5" from the dropdown "[name='toMonth']"
    And I select "5" from the dropdown "[name='toDay']"
    And I click the button/link "[value='First']"
    And I click the button/link "[name='findFlights']"
    Then the url should have "reservation2"
  
  Scenario: As a user, I want to book a one-way flight
    Given I am in "https://demo.guru99.com/test/newtours/reservation.php"
    Then the url should have "reservation"
    When I click the button/link "[value='oneway']"
    And I select "4" from the dropdown "[name='passCount']"
    And I select "Seattle" from the dropdown "[name='fromPort']"
    And I select "11" from the dropdown "[name='fromMonth']"
    And I select "23" from the dropdown "[name='fromDay']"
    And I select "Paris" from the dropdown "[name='toPort']"
    And I select "5" from the dropdown "[name='toMonth']"
    And I select "5" from the dropdown "[name='toDay']"
    And I click the button/link "[value='First']"
    And I click the button/link "[name='findFlights']"
    Then the url should have "reservation2"