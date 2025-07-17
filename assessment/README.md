# Assessment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Setup

In order to work with starter package you must do some simple steps:
1. Make sure node.js is installed ([download](https://nodejs.org/en/))
  - First installation of Node?
    Install Angular client globally with the version you want to have. Type command `npm install -g @angular/cli` or for a specific version e.g. `npm install -g @angular/cli~1.6.5`
2. Change to directory and type command `npm install`

## Project Structure

```plaintext
src/
  app/
    fixtures/                # Static test data (JSON)
    factories/               # Dynamic test data creators
    services/
      order/
        order.service.ts
        order.service.spec.ts        # Unit tests for Order Service
        order-models/
          order.model.ts
          order-status.enum.ts
      payment/
        payment.service.ts
        payment.service.spec.ts      # Unit tests for Payment Service
        payment-models/
          payment.model.ts
          payment-status.enum.ts
    tests/
      integration/            # Integration tests (cross-service scenarios)
        order-payment.integration.spec.ts
        payment-status.integration.spec.ts
    utils/
      http-client.ts          # Angular HttpClient wrapper for API calls
  environments/
    environment.ts           # Development environment config
    environment.prod.ts      # Production environment config

karma.conf.js               # Karma test runner config
package.json                # npm dependencies and scripts
tsconfig.json               # TypeScript compiler config
README.md                   # This documentation file
.github/workflows/ci.yml    # GitHub Actions CI pipeline config
````

## Framework Usage Guide
### Test Types
#### Unit Tests:
Located alongside service files inside `src/app/services/` with `.spec.ts` extension. Use Angular’s TestBed and mocks for isolated testing.

#### Integration Tests:
Located under `src/app/tests/integration/` as `.integration.spec.ts` files. These tests cover integration test workflows using live service endpoints.

#### Test Data
Use fixtures in `src/app/fixtures/` for static test data.
Use factories in `src/app/factories/` for dynamic test data.

## Configure environment variables

The framework reads service URLs from environment files and supports overrides via environment variables.

Edit `src/environments/environment.ts` to specify your local/dev `orderServiceUrl` and `paymentServiceUrl`.
For production or CI use, set the environment variables `ORDER_SERVICE_URL` and `PAYMENT_SERVICE_URL` (recommended to keep sensitive or environment-specific data out of source code).


## Running all tests (unit and integration):

Run `npm test` to execute the unit tests and generate code coverage via [Karma](https://karma-runner.github.io).

Code coverage reports will be generated in the `coverage/` directory, which can be viewed in a browser by opening `index.html`.

## Test Results

After running tests in `test-results` directory, you will find: `junit-report.xml` which contains the test results in JUnit format, suitable for CI/CD pipelines.

## Brief Technology Rationale

Karma and Jasmine: Provide a robust, industry-standard testing framework that integrates tightly with Angular projects, supporting asynchronous testing, spies, and easy configuration.

TypeScript: Enables static typing and improved developer productivity by catching errors early and supporting maintainable, scalable test code.

Angular HttpClient: Offers a clean and testable way to perform HTTP requests in tests, aligning with Angular's reactive and modular design.

Fixtures and Factories: Combining static and dynamic test data strategies allows for flexible, maintainable tests that can easily adapt to various test scenarios.

GitHub Actions: Facilitates seamless CI/CD integration, automating test runs, reporting, and artifact management directly within GitHub.

JUnit Reporting: Generates standard test reports that are easily consumable by CI tools, improving transparency and traceability in automated workflows.
