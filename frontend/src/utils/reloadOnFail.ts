import LoadingIndicator from '../components/Loaders/Circular';

export default function reloadOnFail(
  fn
): Promise<{ default: React.ComponentType<any> }> {
  return new Promise(resolve => {
    fn()
      .then(resolve)
      .catch(() => {
        window.location.reload(true);
        return resolve({ default: LoadingIndicator });
      });
  });
}
