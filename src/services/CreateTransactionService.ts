import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    const ValidateTotal = this.transactionsRepository.getBalance();

    if (type === 'outcome' && value > ValidateTotal.total) {
      throw Error('Outcome is bigger than your Total');
    }

    if (type !== 'income' && type !== 'outcome') {
      throw Error('Type must be income or outcome');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
