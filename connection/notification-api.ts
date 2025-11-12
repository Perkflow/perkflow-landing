import BaseAPI from "./base-api";

export interface NotificationCreate {
  title: string;
  message: string;
  type?: string;
  recipient_id?: number;
  [key: string]: any;
}

export class NotificationAPI extends BaseAPI {
  constructor() {
    super();
  }

  async getNotifications(unreadOnly: boolean = false): Promise<any[]> {
    const url = unreadOnly ? "/notifications?unread=true" : "/notifications";
    return this.request<any[]>({
      method: "GET",
      url,
    });
  }

  async markAsRead(notificationId: number): Promise<any> {
    return this.request<any>({
      method: "PATCH",
      url: `/notifications/${notificationId}/read`,
    });
  }

  async markAllAsRead(): Promise<any> {
    return this.request<any>({
      method: "PATCH",
      url: "/notifications/read-all",
    });
  }

  async createNotification(data: NotificationCreate): Promise<any> {
    return this.request<any>({
      method: "POST",
      url: "/notifications",
      data,
    });
  }

  async deleteNotification(notificationId: number): Promise<any> {
    return this.request<any>({
      method: "DELETE",
      url: `/notifications/${notificationId}`,
    });
  }

  async getUnreadCount(): Promise<number> {
    const result = await this.request<{ count: number }>({
      method: "GET",
      url: "/notifications/unread-count",
    });
    return result.count || 0;
  }
}
