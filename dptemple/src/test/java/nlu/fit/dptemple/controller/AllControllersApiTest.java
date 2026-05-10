package nlu.fit.dptemple.controller;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Comprehensive API test to verify all endpoints are working.
 * Tests public GET endpoints (safe operations only).
 */
class AllControllersApiTest extends BaseControllerTest {

    // ==================== Homepage API ====================
    @Test
    @DisplayName("GET /api/homepage - Should return homepage data")
    void testHomePageApi() throws Exception {
        mockMvc.perform(get("/api/homepage"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.success").value(true));
    }

    // ==================== News API ====================
    @Test
    @DisplayName("GET /api/news - Should return paginated news")
    void testNewsListApi() throws Exception {
        mockMvc.perform(get("/api/news"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("GET /api/news/homepage - Should return homepage news")
    void testNewsHomepageApi() throws Exception {
        mockMvc.perform(get("/api/news/homepage"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("GET /api/news/featured - Should return featured news")
    void testNewsFeaturedApi() throws Exception {
        mockMvc.perform(get("/api/news/featured"))
                .andExpect(status().isOk());
    }

    // ==================== Events API ====================
    @Test
    @DisplayName("GET /api/events - Should return paginated events")
    void testEventsListApi() throws Exception {
        mockMvc.perform(get("/api/events"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("GET /api/events/homepage - Should return homepage events")
    void testEventsHomepageApi() throws Exception {
        mockMvc.perform(get("/api/events/homepage"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("GET /api/events/featured - Should return featured events")
    void testEventsFeaturedApi() throws Exception {
        mockMvc.perform(get("/api/events/featured"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("GET /api/events/upcoming - Should return upcoming events")
    void testEventsUpcomingApi() throws Exception {
        mockMvc.perform(get("/api/events/upcoming"))
                .andExpect(status().isOk());
    }

    // ==================== Dharma Talks API ====================
    @Test
    @DisplayName("GET /api/dharma-talks - Should return paginated dharma talks")
    void testDharmaTalksListApi() throws Exception {
        mockMvc.perform(get("/api/dharma-talks"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("GET /api/dharma-talks/homepage - Should return homepage dharma talks")
    void testDharmaTalksHomepageApi() throws Exception {
        mockMvc.perform(get("/api/dharma-talks/homepage"))
                .andExpect(status().isOk());
    }

    // ==================== Notifications API ====================
    @Test
    @DisplayName("GET /api/notifications - Should return paginated notifications")
    void testNotificationsListApi() throws Exception {
        mockMvc.perform(get("/api/notifications"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("GET /api/notifications/homepage - Should return homepage notifications")
    void testNotificationsHomepageApi() throws Exception {
        mockMvc.perform(get("/api/notifications/homepage"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("GET /api/notifications/featured - Should return featured notifications")
    void testNotificationsFeaturedApi() throws Exception {
        mockMvc.perform(get("/api/notifications/featured"))
                .andExpect(status().isOk());
    }

    // ==================== About API ====================
    @Test
    @DisplayName("GET /api/about - Should return about content")
    void testAboutApi() throws Exception {
        mockMvc.perform(get("/api/about"))
                .andExpect(status().isOk());
    }

    // ==================== Contact Info API ====================
    @Test
    @DisplayName("GET /api/contact-info - Should return contact information")
    void testContactInfoApi() throws Exception {
        mockMvc.perform(get("/api/contact-info"))
                .andExpect(status().isOk());
    }

    // ==================== Social Links API ====================
    @Test
    @DisplayName("GET /api/social-links - Should return social links")
    void testSocialLinksApi() throws Exception {
        mockMvc.perform(get("/api/social-links"))
                .andExpect(status().isOk());
    }

    // ==================== Home Config API ====================
    @Test
    @DisplayName("GET /api/home-config - Should return home configuration")
    void testHomeConfigApi() throws Exception {
        mockMvc.perform(get("/api/home-config"))
                .andExpect(status().isOk());
    }

    // ==================== Users API ====================
    @Test
    @DisplayName("GET /api/users - Should return paginated users")
    void testUsersListApi() throws Exception {
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("GET /api/users/deleted - Should return deleted users")
    void testUsersDeletedApi() throws Exception {
        mockMvc.perform(get("/api/users/deleted"))
                .andExpect(status().isOk());
    }

    // ==================== Messages API ====================
    @Test
    @DisplayName("GET /api/messages/unread - Should return unread messages")
    void testMessagesUnreadApi() throws Exception {
        mockMvc.perform(get("/api/messages/unread"))
                .andExpect(status().isOk());
    }

    // ==================== History Milestones API ====================
    @Test
    @DisplayName("GET /api/history-milestones/by-about/{aboutId} - Should return 200 or 404")
    void testHistoryMilestonesApi() throws Exception {
        mockMvc.perform(get("/api/history-milestones/by-about/test-id"))
                .andExpect(result -> {
                    int status = result.getResponse().getStatus();
                    if (status != 200 && status != 404) {
                        throw new AssertionError("Expected status 200 or 404 but got: " + status);
                    }
                });
    }
}
