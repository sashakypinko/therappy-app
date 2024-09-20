import React, { Fragment, ReactElement } from 'react';
import { Box, Grid, Skeleton, Typography } from '@mui/material';
import { colors } from '../../../config/theme/colors';
import DropZone from '../../ui/drop-zone';
import { IProvider, ProviderAdditional, ProviderAdditionals } from '../../../services/api/provider/dto/provider.dto';
import { FormikErrors, FormikTouched } from 'formik';
import DocumentItem from './document-item';
import { IAttachment } from '../../../services/api/attachment/dto/attachment.dto';
import { useSelector } from 'react-redux';
import { selectUsers } from '../../../store/selectors';

interface DocumentFieldProps {
  documentId: number;
  documentIndex?: number;
  additional?: ProviderAdditional;
  allAdditionals?: ProviderAdditional[];
  onUpload?: (id: number, file: ProviderAdditional | ProviderAdditional[]) => void;
  onRemove?: (id: number) => void;
  loading?: boolean;
  errors?: FormikErrors<IProvider>;
  touched?: FormikTouched<IProvider>;
  readOnly?: boolean;
}

const DocumentField = ({
  documentId,
  documentIndex,
  additional,
  allAdditionals,
  onUpload,
  onRemove,
  loading,
  errors,
  touched,
  readOnly,
}: DocumentFieldProps): ReactElement => {
  const handleEditName = (documentId: number, file: File | IAttachment, name: string) => {
    if (!onUpload) return;

    if (documentIndex !== undefined) {
      const editableDocuments = allAdditionals && Array.isArray(allAdditionals) ? allAdditionals : [];

      if (file instanceof File) {
        onUpload(documentId, [
          ...editableDocuments.slice(0, documentIndex),
          {
            file: new File([file], name, { type: file.type }),
            checked: true,
          },
          ...editableDocuments.slice(documentIndex),
        ]);
      } else {
        onUpload(documentId, [
          ...editableDocuments.slice(0, documentIndex),
          { ...editableDocuments[documentIndex], filename: name },
          ...editableDocuments.slice(documentIndex + 1),
        ]);
      }
    } else {
      if (file instanceof File) {
        onUpload(documentId, {
          file: new File([file], name, { type: file.type }),
          checked: true,
        });
      } else {
        onUpload(documentId, { file, filename: name, checked: true });
      }
    }
  };

  const currentDocument = additional?.file;
  const extension = currentDocument ? currentDocument.name.split('.').slice(-1).toString() : '';

  const validationError =
    errors && errors.additionals && errors.additionals[documentId] && touched && touched.additionals
      ? (errors.additionals[documentId] as string)
      : null;

  return (
    <>
      {loading ? (
        <Skeleton sx={{ borderRadius: '8px' }} variant="rectangular" width="100%" height={currentDocument ? 60 : 40} />
      ) : (
        <>
          {currentDocument ? (
            <DocumentItem
              name={additional?.filename || currentDocument.name}
              extension={extension}
              size={currentDocument.size}
              url={currentDocument instanceof File ? undefined : currentDocument.url}
              onEdit={(name) => handleEditName(documentId, currentDocument, name)}
              onRemove={() => onRemove && onRemove(documentId)}
              readOnly={readOnly}
            />
          ) : (
            <DropZone
              placeholder="Choose file to upload..."
              onLoad={(files) => onUpload && onUpload(documentId, { file: files[0], checked: true })}
              disabled={readOnly}
            />
          )}
        </>
      )}
      {validationError && (
        <Typography sx={{ mt: 1 }} variant="body2" color={colors.error[70]}>
          {validationError}
        </Typography>
      )}
    </>
  );
};

interface DocumentsLoaderProps {
  documents: ProviderAdditionals | undefined;
  displayDocuments?: number[];
  onUpload?: (id: number, file: ProviderAdditional | ProviderAdditional[]) => void;
  onRemove?: (id: number) => void;
  loading?: boolean;
  errors?: FormikErrors<IProvider>;
  touched?: FormikTouched<IProvider>;
  readOnly?: boolean;
  columns?: number;
}

const DocumentsLoader = ({
  documents,
  displayDocuments,
  errors,
  touched,
  columns = 2,
  readOnly,
  loading,
  onUpload,
  onRemove,
}: DocumentsLoaderProps): ReactElement => {
  const { additionalList } = useSelector(selectUsers);

  const handleMultipleUpload = (id: number, file: ProviderAdditional | ProviderAdditional[]) => {
    if (!onUpload || !documents) {
      return;
    }

    onUpload(id, [
      ...(documents[id] && Array.isArray(documents[id]) ? (documents[id] as ProviderAdditional[]) : []),
      file,
    ] as ProviderAdditional[]);
  };

  const handleMultipleRemove = (id: number, index: number) => {
    if (!onUpload || !documents) {
      return;
    }

    const editableDocuments =
      documents[id] && Array.isArray(documents[id]) ? (documents[id] as ProviderAdditional[]) : [];

    onUpload(id, [...editableDocuments.slice(0, index), ...editableDocuments.slice(index + 1)] as ProviderAdditional[]);
  };

  return (
    <Grid sx={{ pt: 6 }} container spacing={6}>
      {additionalList
        .filter(({ is_file, id }) => displayDocuments ? displayDocuments.includes(id) : is_file === 1)
        .map(({ id, customer_title, is_multiple }) => {
          const additional = documents && documents[id];

          return (
            <Grid sx={{ paddingTop: '0 !important' }} key={id} item xs={12} md={12 / columns}>
              <Typography sx={{ mb: 1, mt: 2 }} variant="body2" color={colors.secondary[60]}>
                {customer_title}
              </Typography>
              {is_multiple ? (
                <>
                  {((additional as ProviderAdditional[]) || [])
                    .filter(({ media_id, file }: ProviderAdditional) => media_id || file)
                    .map((multipleAdditional, index) => (
                      <Box sx={{ mb: 2 }} key={index}>
                        <DocumentField
                          documentId={id}
                          documentIndex={index}
                          additional={multipleAdditional}
                          allAdditionals={additional as ProviderAdditional[]}
                          onRemove={(additionalId) => handleMultipleRemove(additionalId, index)}
                          onUpload={onUpload}
                          loading={loading}
                          errors={errors}
                          touched={touched}
                          readOnly={readOnly}
                        />
                      </Box>
                    ))}
                  <DocumentField
                    documentId={id}
                    onUpload={handleMultipleUpload}
                    loading={loading}
                    errors={errors}
                    touched={touched}
                    readOnly={readOnly}
                  />
                </>
              ) : (
                <DocumentField
                  documentId={id}
                  additional={additional as ProviderAdditional}
                  onUpload={onUpload}
                  onRemove={onRemove}
                  loading={loading}
                  errors={errors}
                  touched={touched}
                  readOnly={readOnly}
                />
              )}
            </Grid>
          );
        })}
    </Grid>
  );
};

export default DocumentsLoader;
