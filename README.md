#GitScope

It is a simple web app which take the username of a github user then provides the basic information of the account and lists all the repositories of the user.
It is Responsive...
We can select number of results per page and can take a look at every page.

Unit Tests
The unit tests that I've written for this project are totally 11.

ApiService:
should be created
should fetch user data
should fetch repos data

InfoComponent:
should emit setPageNumber event
should have default input_page_size set to 10
should have null userData by default
should set userData when provided through @Input
should create

SearchComponent:
should create
should call getUser when searchUser is executed

MainComponent:
should create

Here 1 service (ApiService) and 1 component (InfoComponent) are having unit tests with 100% code coverage.

To run the tests simply run the ng test command in the angular cli.

Also there are no duplicate Apicalls while changing the pages.
