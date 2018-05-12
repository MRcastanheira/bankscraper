function getAction()
{
  document.bankAcess.action = "/" + document.bankAcess.bankType.value + "/login";
  return true;
}
