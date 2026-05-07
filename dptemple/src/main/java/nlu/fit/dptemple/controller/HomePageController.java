package nlu.fit.dptemple.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import nlu.fit.dptemple.dto.ApiResponse;
import nlu.fit.dptemple.dto.HomepageDataDTO;
import nlu.fit.dptemple.entity.*;
import nlu.fit.dptemple.service.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/homepage")
@RequiredArgsConstructor
@Tag(name = "Homepage", description = "Public API for homepage data")
public class HomePageController {

    private final HomeConfigService homeConfigService;
    private final NotificationService notificationService;
    private final EventService eventService;
    private final NewsService newsService;
    private final DharmaTalkService dharmaTalkService;
    private final AboutService aboutService;
    private final ContactInfoService contactInfoService;
    private final SocialLinkService socialLinkService;

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;
    private static final DateTimeFormatter TIME_FORMATTER = DateTimeFormatter.ofPattern("HH:mm");

    @GetMapping
    @Operation(summary = "Get all homepage data")
    public ResponseEntity<ApiResponse<HomepageDataDTO>> getHomePageData() {
        HomepageDataDTO data = HomepageDataDTO.builder()
                .config(homeConfigService.findActive().map(this::toConfigDTO).orElse(null))
                .notifications(notificationService.findHomepageNotifications().stream()
                        .map(this::toNotificationDTO).collect(Collectors.toList()))
                .featuredNotifications(notificationService.findFeaturedNotifications().stream()
                        .map(this::toNotificationDTO).collect(Collectors.toList()))
                .events(eventService.findHomepageEvents().stream()
                        .map(this::toEventDTO).collect(Collectors.toList()))
                .featuredEvents(eventService.findFeaturedEvents().stream()
                        .map(this::toEventDTO).collect(Collectors.toList()))
                .news(newsService.findHomepageNews().stream()
                        .map(this::toNewsDTO).collect(Collectors.toList()))
                .featuredNews(newsService.findFeaturedNews().stream()
                        .map(this::toNewsDTO).collect(Collectors.toList()))
                .dharmaTalks(dharmaTalkService.findHomepageDharmaTalks().stream()
                        .map(this::toDharmaTalkDTO).collect(Collectors.toList()))
                .about(aboutService.findActive().map(this::toAboutDTO).orElse(null))
                .contactInfo(contactInfoService.findAllActive().stream()
                        .map(this::toContactInfoDTO).collect(Collectors.toList()))
                .socialLinks(socialLinkService.findAllActive().stream()
                        .map(this::toSocialLinkDTO).collect(Collectors.toList()))
                .build();
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    private HomepageDataDTO.HomeConfigDTO toConfigDTO(HomeConfig config) {
        return HomepageDataDTO.HomeConfigDTO.builder()
                .id(config.getId())
                .heroImageUrl(config.getHeroImageUrl())
                .heroTitle(config.getHeroTitle())
                .heroDescription(config.getHeroDescription())
                .introductionText(config.getIntroductionText())
                .build();
    }

    private HomepageDataDTO.NotificationDTO toNotificationDTO(Notification notification) {
        return HomepageDataDTO.NotificationDTO.builder()
                .id(notification.getId())
                .title(notification.getTitle())
                .content(notification.getContent())
                .isFeatured(notification.getIsFeatured())
                .homepagePriority(notification.getHomepagePriority())
                .build();
    }

    private HomepageDataDTO.EventDTO toEventDTO(Event event) {
        return HomepageDataDTO.EventDTO.builder()
                .id(event.getId())
                .title(event.getTitle())
                .imageUrl(event.getImageUrl())
                .startDate(event.getStartDate() != null ? event.getStartDate().format(DATE_FORMATTER) : null)
                .endDate(event.getEndDate() != null ? event.getEndDate().format(DATE_FORMATTER) : null)
                .eventTime(event.getEventTime() != null ? event.getEventTime().format(TIME_FORMATTER) : null)
                .location(event.getLocation())
                .description(event.getDescription())
                .isFeatured(event.getIsFeatured())
                .build();
    }

    private HomepageDataDTO.NewsDTO toNewsDTO(News news) {
        return HomepageDataDTO.NewsDTO.builder()
                .id(news.getId())
                .title(news.getTitle())
                .publishedDate(news.getPublishedDate() != null ? news.getPublishedDate().format(DATE_FORMATTER) : null)
                .authorName(news.getAuthor() != null ? news.getAuthor().getFullName() : null)
                .thumbnailUrl(news.getThumbnailUrl())
                .isFeatured(news.getIsFeatured())
                .build();
    }

    private HomepageDataDTO.DharmaTalkDTO toDharmaTalkDTO(DharmaTalk talk) {
        return HomepageDataDTO.DharmaTalkDTO.builder()
                .id(talk.getId())
                .title(talk.getTitle())
                .youtubeUrl(talk.getYoutubeUrl())
                .thumbnailUrl(talk.getThumbnailUrl())
                .description(talk.getDescription())
                .build();
    }

    private HomepageDataDTO.AboutDTO toAboutDTO(About about) {
        return HomepageDataDTO.AboutDTO.builder()
                .id(about.getId())
                .yearsEstablished(about.getYearsEstablished())
                .totalBuddhists(about.getTotalBuddhists())
                .annualEvents(about.getAnnualEvents())
                .charityActivities(about.getCharityActivities())
                .introductionText(about.getIntroductionText())
                .build();
    }

    private HomepageDataDTO.ContactInfoDTO toContactInfoDTO(ContactInfo contact) {
        return HomepageDataDTO.ContactInfoDTO.builder()
                .id(contact.getId())
                .label(contact.getLabel())
                .address(contact.getAddress())
                .phone(contact.getPhone())
                .email(contact.getEmail())
                .openTime(contact.getOpenTime() != null ? contact.getOpenTime().format(TIME_FORMATTER) : null)
                .closeTime(contact.getCloseTime() != null ? contact.getCloseTime().format(TIME_FORMATTER) : null)
                .build();
    }

    private HomepageDataDTO.SocialLinkDTO toSocialLinkDTO(SocialLink link) {
        return HomepageDataDTO.SocialLinkDTO.builder()
                .id(link.getId())
                .platform(link.getPlatform())
                .url(link.getUrl())
                .icon(link.getIcon())
                .build();
    }
}
