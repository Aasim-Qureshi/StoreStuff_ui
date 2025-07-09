import { apiClient } from '../../shared/api/apiClient';

export const getChildrenFolders = async (spaceId: string, parentId: string | null) => {
  const response = await apiClient.post(
    '/folder/children',
    { spaceId, parentId }, 
    {},
    'Failed to fetch folder contents'
  );

  return response.data;
};

export const createFolder = async (
  name: string,
  spaceId: string | undefined,
  folderPath: string
) => {
  const response = await apiClient.post(
    '/folder/create',
    { spaceId, folderPath, name },
    {},
    'Failed to create folder'
  );

  return response.data;
};

export const uploadFile = async ({
  file,
  spaceId,
  folderId,
  name,
  type,
  cloudPath,
}: {
  file: File;
  spaceId: string;
  folderId: string | null;
  name: string;
  type: string;
  cloudPath: string;
}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('spaceId', spaceId);
  formData.append('folderId', folderId ?? '');
  formData.append('name', name);
  formData.append('type', type);
  formData.append('cloudPath', cloudPath);

  const response = await apiClient.post(
    '/file/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    'Failed to upload file'
  );

  return response.data;
};

export const deleteFile = async (fileId: string) => {
  const response = await apiClient.delete(
    `/file/delete/${fileId}`,
    {},
    'Failed to delete file'
  );

  return response.data;
}

export const deleteFolder = async (folderId: string) => {
  const response = await apiClient.delete(
    `/folder/delete/${folderId}`,
    {},
    'Failed to delete folder'
  ); 

  return response.data;
}

export const editFilename = async (fileId: string, name: string) => {
  const response = await apiClient.patch(
    `/file/update/`,
    { fileId, name },
    {},
    'Failed to edit file name'
  );

  return response.data;
}

export const editFolderName = async (folderId: string, name: string) => {
  const response = await apiClient.patch(
    `/folder/update/`,
    { folderId, name },
    {},
    'Failed to edit folder name'
  );
  return response.data;
}

export const getFolderById = async (folderId: string) => {
  const response = await apiClient.get(
    `/folder/get/${folderId}`,
    {},
    'Failed to fetch folder details'
  );

  return response.data;
}

export const downloadFile = async (publicId: string) => {
  const response = await apiClient.get(
    '/file/download',
    {
      params: { publicId },
      responseType: 'blob' 
    },
    'Failed to download file'
  );

  return response.data;
};

export const sendInvite = async (email: string, spaceId: string) => {
  const response = await apiClient.post(
    '/invite/send',
    { 
      recipientEmail: email, 
      spaceId, 
      role: "editor"
    },
    {},
    'Failed to send invite'
  );

  return response.data;
}

export const getInvitations = async (email: string) => {
  const response = await apiClient.get(
    `/invite/get/${email}`,
    {},
    'Failed to fetch invitations'
  );

  return response.data;
}

export const acceptInvite = async (invitationId: string) => {
  const response = await apiClient.post(
    '/invite/accept',
    { invitationId, status: 'accepted' },
    {},
    'Failed to accept invitation'
  );

  return response.data;
};