package gr.helix.core.web.config;

import java.util.concurrent.TimeUnit;

import org.springframework.cache.CacheManager;
import org.springframework.cache.caffeine.CaffeineCacheManager;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.github.benmanes.caffeine.cache.Caffeine;

@Configuration
public class CacheConfiguration {

    @Bean
    public CacheManager cacheManager() {
        final CaffeineCacheManager cacheManager = new CaffeineCacheManager("publications", "queries");

        cacheManager.setAllowNullValues(false);
        cacheManager.setCaffeine(this.caffeineCacheBuilder());

        return cacheManager;
    }

    Caffeine<Object, Object> caffeineCacheBuilder() {
        return Caffeine.newBuilder()
            .initialCapacity(1000)
            .maximumSize(5000)
            .expireAfterAccess(48, TimeUnit.HOURS)
            .recordStats();
    }

}
