import { UserAnalytics } from '@/features/user/domain/user-analytics';
import { UserAnalyticsEntity } from '@/features/user/infrastructure/entity/user-analytics.entity';

export class UserAnalyticsMapper {
  static toEntity(model: UserAnalytics) {
    return new UserAnalyticsEntity({
      userId: model.getUserId(),
      articleCount: model.getArticleCount(),
      updatedDate: model.getUpdatedDate(),
    });
  }

  static toModel(entity: UserAnalyticsEntity) {
    return new UserAnalytics({
      userId: entity.userId,
      articleCount: entity.articleCount,
      updatedDate: entity.updatedDate,
    });
  }
}
