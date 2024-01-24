Feature: The Expedia website

  Scenario: Expedia home
    Given I am in "https://demoqa.com/"
    When I go to "https://www.expedia.fr"
    Then the url should have "expedia"
