import { apiClient } from '../../shared/api/apiClient';
import { type Space } from './types';

interface SpacesResponse {
  status: number;
  message: string;
  data: Space[];
}

export const getSpacesByUserId = () => {
  return apiClient.get<SpacesResponse>('/space/my-spaces', {}, 'Failed to fetch user spaces');
};

export const createSpace = (spaceName: string) => {
  return apiClient.post('/space/create', {spaceName}, {}, 'Failed to create space');     
};

export const deleteSpace = (spaceId: string) => {
  return apiClient.delete(`/space/delete/${spaceId}`, {}, 'Failed to delete space');
};


export const updateSpaceName = (spaceId: string, newName: string) => {
  return apiClient.patch(`/space/update/${spaceId}`, { spaceName: newName }, {}, 'Failed to update space name');
};

