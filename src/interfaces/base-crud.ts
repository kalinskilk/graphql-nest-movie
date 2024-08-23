import { FieldsAndRelations } from 'src/decorators/fields-gql';
import { FindOneOptions, FindOptionsWhere } from 'typeorm';

export interface BaseCrud<T> {
  /**
   * Creates a new record.
   *
   * @param {...any[]} params - The parameters for creating the record.
   * @return {Promise<T>} - A promise that resolves with the HTTP response after creating the record.
   */
  create(...params: any[]): Promise<T>;

  /**
   * Validates the input for creating a record.
   *
   * @param {...any[]} params - The parameters for creating the record.
   * @return {void} This function does not return anything.
   */
  createValidate(...params: any[]): void;

  /**
   * Validates the maximum lengths of fields.
   *
   * @param {...any[]} params - The parameters for creating the record.
   * @return {void} This function does not return anything.
   */
  validateMaxLengthsFields(...params: any[]): void;

  /**
   * Finds all records.
   *
   * @param {...any[]} params - The parameters for finding all records.
   * @return {Promise<T[]>} - A promise that resolves with the HTTP response after finding all records.
   */
  findAll(...params: any[]): Promise<T[]>;

  /**
   * Finds all records with pagination.
   *
   * @param {number} page - The page number.
   * @param {number} offset - The number of records to skip.
   * @param {FieldsAndRelations<T>} fieldsAndRelations - Fields and relations of gql.
   * @return {Promise<T[]>} - A promise that resolves with the HTTP response after finding all records with pagination.
   */
  findAll(
    page: number,
    offset: number,
    fieldsAndRelations: FieldsAndRelations<T>,
  ): Promise<T[]>;

  /**
   * Finds all records.
   *
   * @param {...any[]} params - The parameters for finding one record.
   * @return {Promise<T[]>} - A promise that resolves with the HTTP response after finding all records.
   */
  findOne(...params: any[]): Promise<T>;

  /**
   * Finds a record by the given options.
   *
   * @param {FindOneOptions<T>} options - The options for finding the record.
   * @param {FieldsAndRelations<T>} fieldsAndRelations - Fields and relations of gql.
   * @return {Promise<T>} - A promise that resolves with the HTTP response after finding the record.
   */
  findOne(
    options: FindOneOptions<T>,
    fieldsAndRelations: FieldsAndRelations<T>,
  ): Promise<T>;

  /**
   * Counts the number of records that match the given options.
   *
   * @param {FindOneOptions<T>} options - The options for counting the records.
   * @return {Promise<number>} - A promise that resolves with the HTTP response after counting the records.
   */
  count(options: FindOneOptions<T>): Promise<number>;

  /**
   * Updates a record.
   *
   * @param {...any[]} params - The parameters for updating the record.
   * @return {Promise<boolean>} - A promise that resolves with the HTTP response after updating the record.
   */
  update(...params: any[]): Promise<boolean>;

  /**
   * Validates the input for updating a record.
   *
   * @param {...any[]} params - The parameters for updating the record.
   * @return {void} This function does not return anything.
   */
  updateValidate(...params: any[]): void;

  /**
   * Removes a record.
   *
   * @param {...any[]} params - The parameters for removing the record.
   * @return {Promise<boolean>} - A promise that resolves with the HTTP response after removing the record.
   */
  remove(...params: any[]): Promise<boolean>;

  /**
   * Removes a record by condition.
   *
   * @param {FindOneOptions<T>} conditions - The parameters for removing the record.
   * @return {Promise<boolean>} - A promise that resolves with the HTTP response after removing the record.
   */
  removeByConditions?(conditions: FindOptionsWhere<T>): Promise<boolean>;
}
