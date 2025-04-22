Feature: Payments API End‑to‑end

  Background:
    Given the API is running at "https://xw48ou83j6.execute-api.ap-southeast-2.amazonaws.com/prod"

  Scenario: Create, retrieve, and list a payment
    When I create a payment with amount 42 and currency "USD"
    Then the response status should be 201
    And the JSON response should contain a field "result"

    When I retrieve the payment by ID
    Then the response status should be 200
    And the JSON response should contain "id", "amount", and "currency"

    When I list payments filtered by currency "USD"
    Then the response status should be 200
    And the JSON response should include my payment in the data array
