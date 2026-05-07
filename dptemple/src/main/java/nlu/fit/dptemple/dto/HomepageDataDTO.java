package nlu.fit.dptemple.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HomepageDataDTO {

    private HomeConfigDTO config;
    private List<NotificationDTO> notifications;
    private List<NotificationDTO> featuredNotifications;
    private List<EventDTO> events;
    private List<EventDTO> featuredEvents;
    private List<NewsDTO> news;
    private List<NewsDTO> featuredNews;
    private List<DharmaTalkDTO> dharmaTalks;
    private AboutDTO about;
    private List<ContactInfoDTO> contactInfo;
    private List<SocialLinkDTO> socialLinks;

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HomeConfigDTO {
        private String id;
        private String heroImageUrl;
        private String heroTitle;
        private String heroDescription;
        private String introductionText;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NotificationDTO {
        private String id;
        private String title;
        private String content;
        private Boolean isFeatured;
        private Integer homepagePriority;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class EventDTO {
        private String id;
        private String title;
        private String imageUrl;
        private String startDate;
        private String endDate;
        private String eventTime;
        private String location;
        private String description;
        private Boolean isFeatured;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class NewsDTO {
        private String id;
        private String title;
        private String publishedDate;
        private String authorName;
        private String thumbnailUrl;
        private Boolean isFeatured;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DharmaTalkDTO {
        private String id;
        private String title;
        private String youtubeUrl;
        private String thumbnailUrl;
        private String description;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class AboutDTO {
        private String id;
        private Integer yearsEstablished;
        private Integer totalBuddhists;
        private Integer annualEvents;
        private Integer charityActivities;
        private String introductionText;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ContactInfoDTO {
        private String id;
        private String label;
        private String address;
        private String phone;
        private String email;
        private String openTime;
        private String closeTime;
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SocialLinkDTO {
        private String id;
        private String platform;
        private String url;
        private String icon;
    }
}
