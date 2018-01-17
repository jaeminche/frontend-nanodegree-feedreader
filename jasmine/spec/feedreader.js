/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* A test suite that contains a related set of tests.
     * This suite is all about the RSS feeds definitions,
     * the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* It tests to make sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('has URLs defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
         });


        /* A test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('has names defined and not empty', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
         });
    });


    /* A test suite named "The menu" */
    describe('The menu', function() {
        /* A test that ensures the menu element is hidden by default.
         */
        it('element is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* A test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('changes visibility when the menu icon is clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* A test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* A test that ensures when the asynchronous loadFeed
         * function is called and completes its work, there is
         * at least a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('there is at least a single entry element within the feed container ', function() {
            expect($('.feed').children().length).toBeGreaterThan(0);
        });
    });


    /* A test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* A test that ensures when a new feed is loaded
         * by the asynchronus loadFeed function that the content actually changes.
         */
        var previousFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                // Get the previous feed
                previousFeed = $('.feed').html();
                // Load a new feed
                loadFeed(1, done);
            });
        });

        it('takes in effect by having a new content', function() {
            expect($('.feed').html()).not.toEqual(previousFeed);
        });
     });
}());
